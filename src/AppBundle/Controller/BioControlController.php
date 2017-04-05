<?php
// src/AppBundle/Controller/BioControlController.php
namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Doctrine\DBAL\Query\QueryBuilder;

class BioControlController extends Controller
{
    /**
     * @Route("/bio_control/sample", name="get_bio_control_sample")
     */
    public function getBioControlSampleAction(Request $request)
    {

        $sample_number = $request->request->get('sample_number');

        $bioControlEm = $this->get('doctrine.dbal.bio_control_connection');

        $queryBuilder = $bioControlEm->createQueryBuilder();
        $queryBuilder
            ->select('s.SmpID', 's.RunID', 'r.ExpID', 's.Dat', 'p.PerNam')
            ->from('Samples', 's')
            ->innerJoin('s', 'Runs', 'r', 's.RunID = r.RunID')
            ->innerJoin('s', 'Person', 'p', 's.PerID=p.PerID')
            ->where('s.SmpID = ?')
            ->setParameter(0, $sample_number);

        $sample = $queryBuilder->execute()->fetchAll();

        if (empty($sample)) {
            $response = array("code" => 100, "success" => false, "sample_number" => $sample_number, "sample_data" => array());
        } else {
            $response = array("code" => 100, "success" => true, "sample_number" => $sample_number, "sample_data" => $sample[0]);
        }




        return new JsonResponse($response);
    }
}