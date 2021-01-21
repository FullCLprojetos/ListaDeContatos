<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Entity(repositoryClass=ContatosRepository::class)
 */ 
class Contatos implements JsonSerializable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    public ?int $id;

    /**
     * @ORM\Column(type= "string")
     */
    public String $nome;

    /**
     * @ORM\Column(type= "string")
     */

    public String $numero;

    /**
    * @ORM\Column(type= "string")
     */
    public String $email;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNome(): String
    {
        return $this->nome;
    }

    public function setNome($nome): self
    {
        $this->nome = $nome;

        return $this;
    }

    public function getNumero(): String
    {
        return $this->numero;
    }

    public function setNumero($numero): self
    {
        $this->numero = $numero;

        return $this;
    }

    public function getEmail(): String
    {
        return $this->email;
    }

    public function setEmail($email): Self
    {
        $this->email = $email;

        return $this;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'nome' => $this->getNome(),
            'numero' => $this->getNumero(),
            'email' => $this->getEmail(),

            '_links' => [
                    'rel' => 'listarContato_API',
                    'path' => '/api/contatos/' . $this->getId()
                ],
        ];
    }
    
}
