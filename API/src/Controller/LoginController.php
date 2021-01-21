<?php

namespace App\Controller;

use Firebase\JWT\JWT;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class LoginController extends AbstractController
{
    private $repository;

    protected $encoder;

    public function __construct(UserRepository $repository, UserPasswordEncoderInterface $encoder)
    {
        $this->repository = $repository;
        $this->encoder = $encoder;
    }

    /**
     * @Route("/login", name="login")
     */
    public function index(Request $request)
    {
        $dadosEmJson = json_decode($request->getContent());

        if(is_null($dadosEmJson->usuario) || is_null($dadosEmJson->senha)){
            return new JsonResponse(['erro' => 'Favor enviar usuário e senha'],
            Response::HTTP_BAD_REQUEST);
        }

        $user = $this->repository->findOneBy(['username' => $dadosEmJson->usuario]);

        if (!$this->encoder->isPasswordValid($user, $dadosEmJson->senha)){
            return new JsonResponse(['erro' => 'Ususario ou senha invalidos'],
            Response::HTTP_UNAUTHORIZED);
        }

        $token = JWT::encode(['username' => $user->getUsername()],'chavosa');

        return new JsonResponse(['access_token' => $token]);
    }
}
