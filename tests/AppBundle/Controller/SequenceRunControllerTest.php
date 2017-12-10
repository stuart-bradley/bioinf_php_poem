<?php

namespace Tests\AppBundle\Controller;


use Liip\FunctionalTestBundle\Test\WebTestCase;

class SequenceRunControllerTest extends WebTestCase
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
        $helper = $this->helper;

        $client = $this->makeClient();
        $crawler = $client->request('GET', '/sequence_run/index');
        $this->assertStatusCode(200, $client);
        $this->assertEquals(2, $crawler->filter('tr')->count());
    }

    public function testShow()
    {
        $helper = $this->helper;

        $client = $this->makeClient();
        $sequenceRunId = $helper->fixtures->getReference("sequence_run_1")->getId();
        $crawler = $client->request('GET', "/sequence_run/show/$sequenceRunId");
        $this->assertStatusCode(200, $client);

        $this->assertEquals(2, $crawler->filter('strong:contains("Material")')->count());
        $this->assertEquals(2, $crawler->filter('p:contains("DNA")')->count());
    }

    public function testCreate()
    {
        $helper = $this->helper;

        $client = $this->makeClient();
        $crawler = $client->request('POST', "/sequence_run/new");

        $form = $crawler->selectButton("Create Sequence Run")->form();
        $values = $form->getPhpValues();

        $values['sequence_run']['users'] = [];
        $values['sequence_run']['users'][0] = $this->helper->fixtures->getReference('test_user');
        $values['sequence_run']['kit'] = "Illumina";
        $values['sequence_run']['materialTypeString'] = 1;
        $values['sequence_run']['runCoverageTarget'] = 10;
        $values['sequence_run']['readLength'] = 10;

        $values['sequence_run']['samples'] = [];
        $values['sequence_run']['samples'][0] = $helper->createSample();

        $crawler = $client->request($form->getMethod(), $form->getUri(), $values,
            $form->getPhpFiles());
        $crawler = $client->followRedirect();
        $this->assertEquals(3, $crawler->filter('tr')->count());
    }

    public function testUpdate()
    {
        $helper = $this->helper;

        $client = $this->makeClient();
        $sequenceRunId = $helper->fixtures->getReference("sequence_run_1")->getId();
        $client = $this->makeClient();
        $crawler = $client->request('PATCH', "/sequence_run/edit/$sequenceRunId");

        $form = $crawler->selectButton("Edit Sequence Run")->form();
        $values = $form->getPhpValues();

        $values['sequence_run']['kit'] = "IonTorrent";
        $crawler = $client->request($form->getMethod(), $form->getUri(), $values,
            $form->getPhpFiles());
        $crawler = $client->followRedirect();
        $this->assertEquals(2, $crawler->filter('tr')->count());
    }
}