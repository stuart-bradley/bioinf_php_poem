<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Status
 *
 * @ORM\Table(name="status")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\StatusRepository")
 */
class Status
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
     * @ORM\Column(name="date", type="datetime")
     */
    private $date;

    /**
     * @ORM\ManyToOne(targetEntity="OmicsExperiment", inversedBy="statuses")
     * @ORM\JoinColumn(name="omics_experiment_id", referencedColumnName="id")
     */
    private $omicsExperiment;

    /**
     * @ORM\ManyToOne(targetEntity="StatusStrings", inversedBy="statuses")
     * @ORM\JoinColumn(name="status_strings_id", referencedColumnName="id")
     */
    private $statusString;

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
     * Set date
     *
     * @param \DateTime $date
     *
     * @return Status
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set omicsExperiment
     *
     * @param \AppBundle\Entity\OmicsExperiment $omicsExperiment
     *
     * @return Status
     */
    public function setOmicsExperiment(\AppBundle\Entity\OmicsExperiment $omicsExperiment = null)
    {
        $this->omicsExperiment = $omicsExperiment;

        return $this;
    }

    /**
     * Get omicsExperiment
     *
     * @return \AppBundle\Entity\OmicsExperiment
     */
    public function getOmicsExperiment()
    {
        return $this->omicsExperiment;
    }

    /**
     * Set statusString
     *
     * @param \AppBundle\Entity\StatusStrings $statusString
     *
     * @return Status
     */
    public function setStatusString(\AppBundle\Entity\StatusStrings $statusString = null)
    {
        $this->statusString = $statusString;

        return $this;
    }

    /**
     * Get statusString
     *
     * @return \AppBundle\Entity\StatusStrings
     */
    public function getStatusString()
    {
        return $this->statusString;
    }
}
