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

    public function testCreate()
    {
        $this->loadTestFixtures();

        $client = $this->makeClient();
        $crawler = $client->request('POST', "/sequence_run/new");

        $form = $crawler->selectButton("Create Sequence Run")->form();
        $values = $form->getPhpValues();

        $values['sequence_run']['runBy'] = 'stuart.bradley';
        $values['sequence_run']['kit'] = "Illumina";
        $values['sequence_run']['materialTypeString'] = 1;
        $values['sequence_run']['runCoverageTarget'] = 10;
        $values['sequence_run']['readLength'] = 10;

        $values['sequence_run']['samples'] = [];
        $values['sequence_run']['samples'][0] = [];

        $values['sequence_run']['samples'][0]['BCExperimentID'] = 10;
        $values['sequence_run']['samples'][0]['BCSampleID'] = 10;
        $values['sequence_run']['samples'][0]['BCRunID'] = 10;
        $values['sequence_run']['samples'][0]['sampledBy'] = 10;
        $values['sequence_run']['samples'][0]['sampledBy'] = 10;
        $values['sequence_run']['samples'][0]['materialTypeString'] = 1;
        $values['sequence_run']['samples'][0]['RNALaterTreated'] = 1;

        $values['sequence_run']['samples'][0]['sampledDateTime'] = [];
        $values['sequence_run']['samples'][0]['sampledDateTime']['time'] = [];
        $values['sequence_run']['samples'][0]['sampledDateTime']['date'] = [];

        $values['sequence_run']['samples'][0]['sampledDateTime']['date']['year'] = 2012;
        $values['sequence_run']['samples'][0]['sampledDateTime']['date']['month'] = 1;
        $values['sequence_run']['samples'][0]['sampledDateTime']['date']['day'] = 1;

        $values['sequence_run']['samples'][0]['sampledDateTime']['time']['hour'] = 00;
        $values['sequence_run']['samples'][0]['sampledDateTime']['time']['minute'] = 00;

        $crawler = $client->request($form->getMethod(), $form->getUri(), $values,
            $form->getPhpFiles());
        $crawler = $client->followRedirect();
        $this->assertEquals(3, $crawler->filter('tr')->count());
    }
}