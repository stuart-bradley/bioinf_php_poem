<?php

// src/AppBundle/DataFixtures/ORM/LoadMaterialTypeStrings.php

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use AppBundle\Entity\MaterialTypeStrings;

class LoadMaterialTypeStrings extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $materialTypes = [
            "DNA",
            "RNA",
            "Protein",
            "Biomass"
        ];
        foreach($materialTypes as $materialType) {
            $materialTypeString = new MaterialTypeStrings();
            $materialTypeString -> setType($materialType);
            $manager -> persist($materialTypeString);
        }
        $manager->flush();
    }

    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 2;
    }
}