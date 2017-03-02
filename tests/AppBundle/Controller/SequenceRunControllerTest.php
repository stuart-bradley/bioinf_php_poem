<?php

namespace Tests\AppBundle\Controller;


use Liip\FunctionalTestBundle\Test\WebTestCase;

class SequenceRunControllerTest extends WebTestCase
{

    public function testIndex()
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

        $client = $this->makeClient();
        $crawler = $client->request('GET', '/sequence_run/index');
        $this->assertStatusCode(200, $client);
        $this->assertGreaterThan(1, $crawler->filter('tr')->count());
    }
}