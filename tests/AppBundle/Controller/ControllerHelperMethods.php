<?php
/**
 * Created by PhpStorm.
 * User: wackm
 * Date: 07-Mar-17
 * Time: 10:45 AM
 */

namespace Tests\AppBundle\Controller;

use Liip\FunctionalTestBundle\Test\WebTestCase;

class ControllerHelperMethods extends WebTestCase
{
    public $fixtures;

    public function loadTestFixtures()
    {
        $this->fixtures = $this->loadFixtures(array(
            'AppBundle\DataFixtures\ORM\Real\LoadFOSUsers',
            'AppBundle\DataFixtures\ORM\Real\LoadMaterialTypeStrings',
            'AppBundle\DataFixtures\ORM\Real\LoadStatusStrings',
            'AppBundle\DataFixtures\ORM\Real\LoadOmicsExperimentSubTypeStrings',
            'AppBundle\DataFixtures\ORM\Real\LoadOmicsExperimentTypeStrings',
            'AppBundle\DataFixtures\ORM\Test\LoadSamples',
            'AppBundle\DataFixtures\ORM\Test\LoadStatus',
            'AppBundle\DataFixtures\ORM\Test\LoadSequenceRuns',
            'AppBundle\DataFixtures\ORM\Test\LoadOmicsExperimentSubTypes',
            'AppBundle\DataFixtures\ORM\Test\LoadOmicsExperimentTypes',
            'AppBundle\DataFixtures\ORM\Test\LoadOmicsExperiments',
        ))->getReferenceRepository();
    }

    public function createStatus()
    {
        $statusArray = [];
        $statusArray['statusString'] = 1;
        $statusArray['date'] = $this->createDate();

        return $statusArray;
    }

    public function createDate()
    {
        $dateArray = [];

        $dateArray['year'] = 2012;
        $dateArray['month'] = 1;
        $dateArray['day'] = 1;

        return $dateArray;
    }

    public function createOmicsExperimentType()
    {
        $omicsExperimentTypeArray = [];
        $omicsExperimentTypeArray['omicsExperimentTypeString'] = 1;
        $omicsExperimentTypeArray['omicsExperimentSubTypes'] = [];

        return $omicsExperimentTypeArray;

    }

    public function createOmicsExperimentSubType()
    {
        $omicsExperimentSubTypeArray = [];
        $omicsExperimentSubTypeArray['omicsExperimentSubTypeString'] = 1;
        $omicsExperimentSubTypeArray['samples'] = [];

        return $omicsExperimentSubTypeArray;

    }

    public function createSample()
    {
        $sampleArray = [];

        $sampleArray['BCExperimentID'] = 10;
        $sampleArray['BCSampleID'] = 10;
        $sampleArray['BCRunID'] = 10;
        $sampleArray['sampledBy'] = $this->fixtures->getReference('Stuart.Bradley');
        $sampleArray['materialTypeString'] = 1;
        $sampleArray['RNALaterTreated'] = 1;

        $sampleArray['sampledDateTime'] = $this->createDateTime();

        return $sampleArray;
    }

    public function createDateTime()
    {
        $dateArray = [];

        $dateArray['time'] = [];
        $dateArray['date'] = [];

        $dateArray['date']['year'] = 2012;
        $dateArray['date']['month'] = 1;
        $dateArray['date']['day'] = 1;

        $dateArray['time']['hour'] = 00;
        $dateArray['time']['minute'] = 00;

        return $dateArray;
    }
}