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

        $bioControlEm = $this->get('doctrine.dbal.bio_control_connection');
        $sql = 'SELECT * FROM fos_user WHERE id = ?';
        //$sql = "SELECT Samples.SmpID, Samples.RunID, Runs.ExpID, Samples.Dat, Person.PerNam FROM Samples INNER JOIN Runs ON Samples.RunID=Runs.RunID INNER JOIN Person ON Samples.PerID=Person.PerID WHERE SmpID = ?";
        $sample = $bioControlEm->fetchAll($sql, array($sample_number));

        if (empty($sample)) {
            $response = array("code" => 100, "success" => false, "sample_number" => $sample_number, "sample_data" => array());
        } else {
            $response = array("code" => 100, "success" => true, "sample_number" => $sample_number, "sample_data" => $sample[0]);
        }




        return new JsonResponse($response);
    }
}