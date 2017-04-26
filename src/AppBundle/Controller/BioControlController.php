<?php
// src/AppBundle/Controller/BioControlController.php
namespace AppBundle\Controller;

use AppBundle\Entity\FOSUser;
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
            ->select('s.SmpID', 's.RunID', 'r.ExpID', 's.Dat', 'p.PerNam', 'r.InoculationTime')
            ->from('Samples', 's')
            ->innerJoin('s', 'Runs', 'r', 's.RunID = r.RunID')
            ->innerJoin('s', 'Person', 'p', 's.PerID=p.PerID')
            ->where('s.SmpID = ?')
            ->setParameter(0, $sample_number);

        $sample = $queryBuilder->execute()->fetchAll();

        if (empty($sample)) {
            $response = array("code" => 100, "success" => false, "sample_number" => $sample_number, "sample_data" => array(), "new_user" => false, "comments" => "");
        } else {
            $comments = $this->createCommentSection($sample[0]);
            $user = $this->getDoctrine()
                ->getRepository('AppBundle:FOSUser')
                ->findOneByCn($sample[0]['PerNam']);

            if ($user) {
                $user_id = $user->getId();
                $response = array("code" => 100, "success" => true, "sample_number" => $sample_number, "sample_data" => $sample[0], "new_user" => false, "user_id" => $user_id, "comments" => $comments);
            } else {
                $user_id = $this->createNewUser($sample[0]['PerNam']);
                $response = array("code" => 100, "success" => true, "sample_number" => $sample_number, "sample_data" => $sample[0], "new_user" => true, "user_id" => $user_id, "comments" => $comments);

            }


        }
        return new JsonResponse($response);
    }


    private function createNewUser($name)
    {
        $user = new FOSUser();
        $user->setCn($name);

        $username = str_replace(" ", ".", $name);
        $user->setUsername($username);
        $user->setUsernameCanonical(strtolower($username));

        $domain = $this->getParameter('ldap_domain_long');

        $email = $username . $domain;
        $user->setEmail($email);
        $user->setEmailCanonical(strtolower($email));

        $user->setFromBioControl(true);

        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        return $user->getId();
    }

    private function createCommentSection($sample)
    {
        $comments = "";

        if (!empty($sample["InoculationTime"])) {
            $date_org = new \DateTime($sample["InoculationTime"]);
            $date_now = new \DateTime();

            $diff = $date_org->diff($date_now)->format("%a");

            $comments .= "Fermentation Day: " . $diff . "\n";
        }

        $comments = rtrim($comments);

        return $comments;
    }
}