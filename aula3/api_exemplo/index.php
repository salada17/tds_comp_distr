<?php

class Request {
    public $queryString;
    public $body;

    public function __construct($queryString, $body) {
        $this->queryString = $queryString;
        $this->body = $body;
    }
}

class Response {
    public function json($content, $httpCode = 200) {
        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Credentials: true');
        http_response_code($httpCode);
        echo json_encode($content);
    }
}

class Server {
    private $apiRoutes = [];
    private $webRoutes = [];
    private $routes = [];

    public function registerWebRoute($action, $path, $callable) {
        if (!isset($this->webRoutes[$action])) {
            $this->webRoutes[$action] = [];
        }

        $this->webRoutes[$action][$path] = $callable;
    }

    public function registerApiRoute($action, $path, $callable) {
        if (!isset($this->apiRoutes[$action])) {
            $this->apiRoutes[$action] = [];
        }

        $this->apiRoutes[$action]['/api' . $path] = $callable;
    }

    public function run() {
        $action = $_SERVER['REQUEST_METHOD'];
        $path = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '/';
        $queryString = isset($_SERVER['QUERY_STRING']) ? $_SERVER['QUERY_STRING'] : '';

        // nome=&matricula=
        $fragments = explode('&', $queryString);
        $handledQueryString = [];

        foreach ($fragments as $fragment) {
            $pieces = explode('=', $fragment);
            $handledQueryString[$pieces[0]] = $pieces[1];
        }

        $inputJSON = file_get_contents('php://input');
        $body = json_decode($inputJSON);

        $request = new Request($handledQueryString, $body);
        $response = new Response;

        if ($action === 'OPTIONS') {
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
                header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
            }
            
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
            }

            return;
        }

        if (stripos($path, '/api') !== false) {
            $routes = $this->apiRoutes;
        } else {
            $routes = $this->webRoutes;
        }

        if (isset($routes[$action][$path])) {
            $routes[$action][$path]($request, $response);
        } else {
            $response->json(['msg' => 'Rota não encontrada'], 404);
        }
    }
}

$server = new Server;

$server->registerWebRoute('GET', '/', function(Request $request, Response $response) {
    echo file_get_contents('index.html');
});

$server->registerApiRoute('GET', '/alunos', function(Request $request, Response $response) {
    // Remove filtros vazios, por ex: nome=matheus&matricula=, deixara apenas nome=matheus
    $queryString = array_filter($request->queryString, 'strlen');
    $filename = 'alunos.json';
    $alunosEncontrados = [];

    if (!file_exists($filename)) {
        file_put_contents($filename, '{}');
    }

    $alunos = json_decode(file_get_contents($filename));
    
    foreach ($alunos as $aluno) {
        $expectedFieldsMatch = array_fill(0, count($queryString), true);
        $fieldsResultMatch = $expectedFieldsMatch;
        $counter = 0;
        
        foreach ($queryString as $field => $value) {
            if ($field === 'nome') {
                $shouldInclude = stripos($aluno->nome, $queryString['nome']) !== false;
                $fieldsResultMatch[$counter] = $shouldInclude;
            } elseif ($field === 'matricula') {
                $shouldInclude = stripos($aluno->matricula, $queryString['matricula']) !== false;
                $fieldsResultMatch[$counter] = $shouldInclude;
            }
            $counter++;
        }

        if ($expectedFieldsMatch === $fieldsResultMatch) {
            $alunosEncontrados[] = $aluno;
        }
    }

    $response->json(['alunos' => $alunosEncontrados]);
});

$server->registerApiRoute('POST', '/alunos', function(Request $request, Response $response) {
    $body = $request->body;
    $filename = "alunos.json";
    
    if (!file_exists($filename)) {
        file_put_contents($filename, "{}");
    }

    file_put_contents($filename, json_encode($body->alunos, JSON_PRETTY_PRINT));

    $response->json(["success" => true], 201);
});

$server->run();
