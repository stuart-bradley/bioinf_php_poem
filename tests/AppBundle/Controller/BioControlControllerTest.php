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
        $this->loginAs($this->helper->fixtures->getReference('Stuart.Bradley'), 'main');
    }

    public function testGetBioControlSample()
    {
        $helper = $this->helper;
        $client = $this->makeClient();

        $payload = ['sample_number' => 67655];
        $client->request(
            'POST',
            "/bio_control/sample",
            $payload,
            [],
            ['HTTP_Content-Type' => 'application/json']
        );

        $this->assertStatusCode(200, $client);
    }
}