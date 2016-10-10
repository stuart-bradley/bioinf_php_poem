<?php

// src/AppBundle/DataFixtures/ORM/LoadOmicsExperimentTypeSubStrings.php

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use AppBundle\Entity\OmicsExperimentSubTypeStrings;

class LoadOmicsExperimentTypeSubStrings extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {

        $omicsExperimentSubTypes = [
            ["Transcriptomics","Mutation Analysis"],
            ["Transcriptomics","Contamination Analysis"],
            ["Transcriptomics","Genome Assembly"],
            ["Proteomics","Time Course"],
            ["Proteomics","Differential Expression"]
        ];


        foreach($omicsExperimentSubTypes as $experimentSubType) {
            $omicsExperimentSubTypeString = new OmicsExperimentSubTypeStrings();
            $omicsExperimentSubTypeString -> setType($experimentSubType[1]);
            // Grabs reference by type from LoadOmicsExperimentTypeStrings.
            $omicsExperimentSubTypeString -> setTypeID($this->getReference($experimentSubType[0])->getID());
            $manager -> persist($omicsExperimentSubTypeString);
        }

        $manager->flush();
    }

    // Must be loaded after LoadOmicsExperimentTypeStrings.
    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 4;
    }
}