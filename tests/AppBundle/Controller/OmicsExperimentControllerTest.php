<?php

namespace Tests\AppBundle\Controller;

use Liip\FunctionalTestBundle\Test\WebTestCase;

class OmicsExperimentControllerControllerTest extends WebTestCase
{
    public function setUp()
    {
        $this->loadFixtures(array(
            'AppBundle\DataFixtures\ORM\LoadMaterialTypeStrings',
            'AppBundle\DataFixtures\ORM\LoadStatusStrings',
            'AppBundle\DataFixtures\ORM\LoadOmicsExperimentSubTypeStrings',
            'AppBundle\DataFixtures\ORM\LoadOmicsExperimentTypeStrings',
            'AppBundle\DataFixtures\ORM\Test\LoadSamples',
            'AppBundle\DataFixtures\ORM\Test\LoadStatus',
            'AppBundle\DataFixtures\ORM\Test\LoadSequenceRuns',
            'AppBundle\DataFixtures\ORM\Test\LoadOmicsExperimentSubTypes',
            'AppBundle\DataFixtures\ORM\Test\LoadOmicsExperimentTypes',
            'AppBundle\DataFixtures\ORM\Test\LoadOmicsExperiments',
        ));
    }

    public function testIndex()
    {

        $client = $this->makeClient();
        $crawler = $client->request('GET', '/omics_experiment/index');
        $this->assertStatusCode(200, $client);
    }
}