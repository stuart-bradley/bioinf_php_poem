<?php
// src/AppBundle/Controller/BioControlController.php
namespace AppBundle\Controller;

use AppBundle\Entity\FOSUser;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class BioControlController extends Controller
{
    /**
     * @Route("/bio_control/sample", name="get_bio_control_sample")
     */
    public function getBioControlSampleAction(Request $request)
    {

        $sample_number = $request->request->get('sample_number');

        $BioControlManager = $this->get('app.biocontrol_manager');

        $response = $BioControlManager->getBioControlSample($sample_number);

        return $response;
    }
}