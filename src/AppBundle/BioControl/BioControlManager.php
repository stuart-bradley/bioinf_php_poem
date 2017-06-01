<?php
// src/AppBundle/BioControl/BioControlManager.php
namespace AppBundle\BioControl;

use AppBundle\Entity\FOSUser;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\DBAL\Connection;

class BioControlManager
{
    private $bioControlEm;
    private $em;
    private $domain_name;

    public function __construct(Connection $bioControlEm, EntityManagerInterface $em, $domainName)
    {
        $this->bioControlEm = $bioControlEm;
        $this->em = $em;
        $this->domainName = $domainName;
    }

    public function getBioControlSample($sample_number)
    {

        $queryBuilder = $this->bioControlEm->createQueryBuilder();
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
            $user = $this->em
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

        $domain = $this->domainName;

        $email = $username . "@" . $domain;
        $user->setEmail($email);
        $user->setEmailCanonical(strtolower($email));

        $user->setFromBioControl(true);


        $this->em->persist($user);
        $this->em->flush();

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