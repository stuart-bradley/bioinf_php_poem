<?php
// src/AppBundle/Controller/BioControlController.php
namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
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

        $response = array("code" => 100, "success" => true, "sample_number" => $sample_number, "sample_data" => "test");

        return new JsonResponse($response);
    }
}