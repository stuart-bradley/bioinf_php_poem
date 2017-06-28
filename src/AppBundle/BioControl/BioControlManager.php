<?php
// src/AppBundle/BioControl/BioControlManager.php
namespace AppBundle\BioControl;

use AppBundle\Entity\FOSUser;
use AppBundle\UserManager\UserManager;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManager;
use Doctrine\DBAL\Connection;

/**
 * Class BioControlManager
 * @package AppBundle\BioControl
 */
class BioControlManager
{
    /**
     * @var Connection
     */
    private $bioControlEm;
    /**
     * @var EntityManager
     */
    private $em;
    /**
     * @var string
     */
    private $domainName;
    /**
     * @var UserManager
     */
    private $userManager;

    /**
     * BioControlManager constructor.
     * @param Connection $bioControlEm
     * @param EntityManager $em
     * @param string $domainName
     * @param UserManager $userManager
     */
    public function __construct(Connection $bioControlEm, EntityManager $em, $domainName, UserManager $userManager)
    {
        $this->bioControlEm = $bioControlEm;
        $this->em = $em;
        $this->domainName = $domainName;
        $this->userManager = $userManager;
    }

    /**
     * Gets an individual sample from the BioControl database. Returns JSON.
     * @param string $sample_number
     * @return JsonResponse
     */
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
                ->findOneBy(array('cn' => $sample[0]['PerNam']));

            if ($user) {
                $user_id = $user->getId();
                $response = array("code" => 100, "success" => true, "sample_number" => $sample_number, "sample_data" => $sample[0], "new_user" => false, "user_id" => $user_id, "comments" => $comments);
            } else {
                $user = $this->userManager->findOrCreateUser($sample[0]['PerNam']);
                $user_id = $user->getId();
                $response = array("code" => 100, "success" => true, "sample_number" => $sample_number, "sample_data" => $sample[0], "new_user" => true, "user_id" => $user_id, "comments" => $comments);

            }


        }
        return new JsonResponse($response);
    }

    /**
     * Gets an individual sample from the BioControl database. Returns array query.
     * @param string $sample_number
     * @return array|null
     */
    public function getBioControlSampleNonJSON($sample_number)
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
        if ($sample) {
            $comments = $this->createCommentSection($sample[0]);
            return array($sample[0], $comments);
        } else {
            return null;
        }
    }

    /**
     * Converts various sample fields into a textbox for UI.
     * @param array $sample
     * @return string
     */
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