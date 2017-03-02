<?php

namespace Tests\AppBundle\Controller;


use Liip\FunctionalTestBundle\Test\WebTestCase;

class SequenceRunControllerTest extends WebTestCase
{

    public function testIndex()
    {
        $this->loadTestFixtures();

        $client = $this->makeClient();
        $crawler = $client->request('GET', '/sequence_run/index');
        $this->assertStatusCode(200, $client);
        $this->assertEquals(2, $crawler->filter('tr')->count());
    }

    public function loadTestFixtures()
    {
        $this->fixtures = $this->loadFixtures(array(
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
        ))->getReferenceRepository();
    }

    public function testShow()
    {
        $this->loadTestFixtures();

        $client = $this->makeClient();
        $sequenceRunId = $this->fixtures->getReference("sequence_run_1")->getId();
        $crawler = $client->request('GET', "/sequence_run/show/$sequenceRunId");
        $this->assertStatusCode(200, $client);

        $this->assertEquals(2, $crawler->filter('strong:contains("Material")')->count());
        $this->assertEquals(2, $crawler->filter('p:contains("DNA")')->count());
    }
}