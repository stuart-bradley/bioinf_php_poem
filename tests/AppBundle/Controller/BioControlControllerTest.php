<?php

namespace Tests\AppBundle\Controller;

use Liip\FunctionalTestBundle\Test\WebTestCase;

class BioControllerControllerControllerTest extends WebTestCase
{

    private $helper;

    protected function setUp()
    {
        $this->helper = new ControllerHelperMethods();
        $this->helper->loadTestFixtures();
        $this->loginAs($this->helper->fixtures->getReference('test_user'), 'main');
    }

    public function testGetBioControlSample()
    {
        $helper = $this->helper;
        $client = $this->makeClient();

        $crawler = $client->request(
            'POST',
            "/bio_control/sample",
            array('sample_number' => 67655),
            array(),
            array('HTTP_Content-Type' => 'application/json')
        );

        $JSON_response = json_decode($client->getResponse()->getContent(), true);

        $this->assertStatusCode(200, $client);
        $this->assertNotEmpty($JSON_response);

        $this->assertEquals($JSON_response["code"], 100);
        $this->assertEquals($JSON_response["success"], true);
        $this->assertEquals($JSON_response["sample_number"], 67655);
    }
}