<?php

// src/AppBundle/DataFixtures/ORM/LoadOmicsExperimentTypeStrings.php

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use AppBundle\Entity\OmicsExperimentTypeStrings;
use Sensio\Bundle\FrameworkExtraBundle\EventListener\ParamConverterListener;

class LoadOmicsExperimentTypeStrings extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $omicsExperimentTypes = [
            "Transcriptomics" => ["Mutation Analysis", "Contamination Analysis", "Genome Assembly"],
            "Proteomics" => ["Time Course","Differential Expression"],
            "Metabolomics" => [],
            "Genomics" => []
        ];

        foreach($omicsExperimentTypes as $experimentType => $children) {
            $omicsExperimentTypeString = new OmicsExperimentTypeStrings();
            $omicsExperimentTypeString -> setType($experimentType);
            foreach($children as $child) {
                $omicsExperimentTypeString-> addOmicsExperimentSubTypeString($this->getReference($child));
            }
            $manager -> persist($omicsExperimentTypeString);
        }
        $manager->flush();
    }

    // Must be loaded before LoadOmicsExperimentSubTypeStrings.
    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 4;
    }
}