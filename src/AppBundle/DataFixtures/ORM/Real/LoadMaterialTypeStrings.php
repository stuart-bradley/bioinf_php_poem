<?php

// src/AppBundle/DataFixtures/ORM/Real/LoadMaterialTypeStrings.php

namespace AppBundle\DataFixtures\ORM\Real;

use AppBundle\Entity\MaterialTypeStrings;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

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

        foreach ($materialTypes as $materialType) {
            $materialTypeString = $manager
                ->getRepository('AppBundle:StatusStrings')
                ->findOneBy(array('type' => $materialType));
            if ($materialTypeString == null) {
                $materialTypeString = new MaterialTypeStrings();
                $materialTypeString->setType($materialType);
                $manager->persist($materialTypeString);
            }
            $this->addReference($materialType, $materialTypeString);
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