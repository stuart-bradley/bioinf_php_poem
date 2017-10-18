<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Version
 *
 * @ORM\Table(name="version")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\VersionRepository")
 */
class Version
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="createdAt", type="datetime")
     */
    private $createdAt;

    /**
     * @var array
     *
     * @ORM\Column(name="diff", type="array")
     */
    private $diff;

    /**
     * @var array
     *
     * @ORM\Column(name="hydration", type="array")
     */
    private $hydration;

    /**
     * @ORM\ManyToOne(targetEntity="FOSUSer", inversedBy="versions")
     * @ORM\JoinColumn(name="fos_user_id", referencedColumnName="id")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="OmicsExperiment", inversedBy="versions")
     * @ORM\JoinColumn(name="omics_experiment_id", referencedColumnName="id")
     */
    private $omicsExperiment;

    /**
     * @ORM\ManyToOne(targetEntity="SequenceRun", inversedBy="versions")
     * @ORM\JoinColumn(name="sequence_run_id", referencedColumnName="id")
     **/
    private $sequenceRun;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Version
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set diff
     *
     * @param array $diff
     *
     * @return Version
     */
    public function setDiff($diff)
    {
        $this->diff = $diff;

        return $this;
    }

    /**
     * Get diff
     *
     * @return array
     */
    public function getDiff()
    {
        return $this->diff;
    }

    /**
     * Set hydration
     *
     * @param array $hydration
     *
     * @return Version
     */
    public function setHydration($hydration)
    {
        $this->hydration = $hydration;

        return $this;
    }

    /**
     * Get hydration
     *
     * @return array
     */
    public function getHydration()
    {
        return $this->hydration;
    }

    /**
     * Set user
     * @param FOSUser $user
     * @return Version
     */
    public function setUser($user)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     * @return FOSUser
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set omicsExperiment
     * @param \AppBundle\Entity\OmicsExperiment $omicsExperiment
     * @return Version
     */
    public function setOmicsExperiment(\AppBundle\Entity\OmicsExperiment $omicsExperiment = null)
    {
        $this->omicsExperiment = $omicsExperiment;

        return $this;
    }

    /**
     * Get omicsExperiment
     * @return \AppBundle\Entity\OmicsExperiment
     */
    public function getOmicsExperiment()
    {
        return $this->omicsExperiment;
    }

    /**
     * Set sequenceRun
     * @param \AppBundle\Entity\SequenceRun $sequenceRun
     * @return Version
     */
    public function setSequenceRun(\AppBundle\Entity\SequenceRun $sequenceRun = null)
    {
        $this->sequenceRun = $sequenceRun;

        return $this;
    }

    /**
     * Get sequenceRun
     * @return \AppBundle\Entity\SequenceRun
     */
    public function getSequenceRun()
    {
        return $this->sequenceRun;
    }
}

