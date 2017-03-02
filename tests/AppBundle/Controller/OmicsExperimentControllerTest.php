<?php

namespace Tests\AppBundle\Controller;

use Liip\FunctionalTestBundle\Test\WebTestCase;

class OmicsExperimentControllerControllerTest extends WebTestCase
{

    public function testIndex()
    {

        $this->loadTestFixtures();

        $client = $this->makeClient();
        $crawler = $client->request('GET', '/omics_experiment/index');
        $this->assertStatusCode(200, $client);
        $this->assertGreaterThan(1, $crawler->filter('tr')->count());
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
        $sequenceRunId = $this->fixtures->getReference("omics_experiment_1")->getId();
        $crawler = $client->request('GET', "/omics_experiment/show/$sequenceRunId");
        $this->assertStatusCode(200, $client);

        // Test Omics Experiment.
        $this->assertEquals(1, $crawler->filter('strong:contains("Description")')->count());
        $this->assertEquals(1, $crawler->filter('p:contains("The Description")')->count());

        // Test Status.
        $this->assertEquals(1, $crawler->filter('strong:contains("Status")')->count());
        $this->assertEquals(1, $crawler->filter('p:contains("Waiting for approval")')->count());

        // Test Omics Experiment Type.
        $this->assertEquals(1, $crawler->filter('strong:contains("Experiment type")')->count());
        $this->assertEquals(1, $crawler->filter('p:contains("Transcriptomics")')->count());

        // Test Omics Experiment Sub-Type.
        $this->assertEquals(1, $crawler->filter('strong:contains("Experiment sub-type")')->count());
        $this->assertEquals(1, $crawler->filter('p:contains("Mutation Analysis")')->count());

        //Test Sample.
        $this->assertEquals(1, $crawler->filter('strong:contains("Material")')->count());
        $this->assertEquals(1, $crawler->filter('p:contains("DNA")')->count());
    }
}