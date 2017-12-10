<?php

namespace Tests\AppBundle\Controller;

use Liip\FunctionalTestBundle\Test\WebTestCase;

class OmicsExperimentControllerControllerTest extends WebTestCase
{

    private $helper;

    protected function setUp()
    {
        $this->helper = new ControllerHelperMethods();
        $this->helper->loadTestFixtures();
        $this->loginAs($this->helper->fixtures->getReference('test_user'), 'main');
    }

    public function testIndex()
    {
        $client = $this->makeClient();
        $crawler = $client->request('GET', '/omics_experiment/index');
        $this->assertStatusCode(200, $client);
        $this->assertEquals(1, $crawler->filter('table')->count());
    }

    public function testShow()
    {
        $helper = $this->helper;
        $client = $this->makeClient();
        $sequenceRunId = $helper->fixtures->getReference("omics_experiment_1")->getId();
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
        $this->assertEquals(1, $crawler->filter('p:contains("Time Course")')->count());

        //Test Sample.
        $this->assertEquals(1, $crawler->filter('strong:contains("Material")')->count());
        $this->assertEquals(1, $crawler->filter('p:contains("DNA")')->count());
    }

    public function testCreate()
    {
        $helper = $this->helper;
        $client = $this->makeClient();
        $crawler = $client->request('POST', "/omics_experiment/new");

        $form = $crawler->selectButton("Create Experiment")->form();
        $values = $form->getPhpValues();

        $values['omics_experiment']['projectName'] = 'test experiment';
        $values['omics_experiment']['projectId'] = 'project id test';
        $values['omics_experiment']['users'] = [];
        $values['omics_experiment']['users'][0] = $this->helper->fixtures->getReference('test_user');
        $values['omics_experiment']['description'] = 'description';
        $values['omics_experiment']['questions'] = 'questions';

        $values['omics_experiment']['statuses'] = [];
        $values['omics_experiment']['statuses'][0] = $helper->createStatus();

        $values['omics_experiment']['omicsExperimentTypes'] = [];
        $values['omics_experiment']['omicsExperimentTypes'][0] = $helper->createOmicsExperimentType();

        $values['omics_experiment']['omicsExperimentTypes'][0]['omicsExperimentSubTypes'][0] = $helper->createOmicsExperimentSubType();


        $values['omics_experiment']['omicsExperimentTypes'][0]['omicsExperimentSubTypes'][0]['samples'][0] = $helper->createSample();
        $crawler = $client->request($form->getMethod(), $form->getUri(), $values,
            $form->getPhpFiles());
        $crawler = $client->followRedirect();
        $this->assertStatusCode(200, $client);
    }

    public function testUpdate()
    {
        $helper = $this->helper;
        $client = $this->makeClient();
        $sequenceRunId = $helper->fixtures->getReference("omics_experiment_1")->getId();
        $crawler = $client->request('PATCH', "/omics_experiment/edit/$sequenceRunId");

        $form = $crawler->selectButton("Edit Experiment")->form();
        $values = $form->getPhpValues();

        $values['omics_experiment']['projectName'] = 'test experiment - edited';
        $crawler = $client->request($form->getMethod(), $form->getUri(), $values,
            $form->getPhpFiles());
        $crawler = $client->followRedirect();
        $this->assertStatusCode(200, $client);
    }
}