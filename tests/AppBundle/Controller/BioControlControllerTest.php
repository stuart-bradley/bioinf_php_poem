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
        $crawler = $client->request('POST', "/bio_control/sample", array(), array('sample_number' => 67655), array(
            'CONTENT_TYPE' => 'application/json',
            'HTTP_X-Requested-With' => 'XMLHttpRequest'
        ));
        $this->assertStatusCode(200, $client);
    }
}