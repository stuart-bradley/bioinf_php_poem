<?php

// src/AppBundle/DataFixtures/ORM/Real/LoadOmicsExperimentSubTypeStrings.php

namespace AppBundle\DataFixtures\ORM\Real;

use AppBundle\Entity\OmicsExperimentSubTypeStrings;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class LoadOmicsExperimentSubTypeStrings extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {

        $omicsExperimentTypes = [
            "Transcriptomics" => ["Time Course", "Differential Expression"],
            "Proteomics" => ["Standard"],
            "Metabolomics" => ["Standard"],
            "Genomics" => ["Time Course", "Strain", "Contamination Check", "De Novo Assembly"]
        ];

        foreach ($omicsExperimentTypes as $experimentType => $children) {
            foreach ($children as $experimentSubType) {
                $omicsExperimentSubTypeString = $manager
                    ->getRepository('AppBundle:OmicsExperimentSubTypeStrings')
                    ->findOneBy(array('type' => $experimentSubType));
                if ($omicsExperimentSubTypeString == null) {
                    $omicsExperimentSubTypeString = new OmicsExperimentSubTypeStrings();
                    $omicsExperimentSubTypeString->setType($experimentSubType);
                    $manager->persist($omicsExperimentSubTypeString);
                }
                // Reference to object via type string for use in LoadOmicsExperimentTypeStrings.
                $this->addReference($experimentType . ":" . $experimentSubType, $omicsExperimentSubTypeString);
            }

        }
        $manager->flush();
    }

    // Must be loaded after LoadOmicsExperimentTypeStrings.
    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 3;
    }
}