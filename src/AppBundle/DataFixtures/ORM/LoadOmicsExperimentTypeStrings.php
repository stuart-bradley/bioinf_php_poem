<?php

// src/AppBundle/DataFixtures/ORM/LoadOmicsExperimentTypeStrings.php

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use AppBundle\Entity\OmicsExperimentTypeStrings;

class LoadOmicsExperimentTypeStrings extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $omicsExperimentTypes = [
            "Transcriptomics",
            "Proteomics",
            "Metabolomics",
            "Genomics"
        ];
        foreach($omicsExperimentTypes as $experimentType) {
            $omicsExperimentTypeString = new OmicsExperimentTypeStrings();
            $omicsExperimentTypeString -> setType($experimentType);
            // Reference to object via type string for use in LoadOmicsExperimentSubTypeStrings.
            $this->addReference($experimentType, $omicsExperimentTypeString);
            $manager -> persist($omicsExperimentTypeString);
        }
        $manager->flush();
    }

    // Must be loaded before LoadOmicsExperimentSubTypeStrings.
    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 3;
    }
}