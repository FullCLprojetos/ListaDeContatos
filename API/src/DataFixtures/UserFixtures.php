<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $user = new User();
        $user->setUsername('fulltime')->setPassword('$argon2id$v=19$m=65536,t=4,p=1$RXVvREduRmlZUElTemhNcg$R8nwB3CHkroHKnqG5db2/V2UsVQUkJYoBZdE+/1px/0');

        $manager->persist($user);

        $manager->flush();
    }
}
