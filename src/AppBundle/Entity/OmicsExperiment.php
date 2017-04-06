<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * OmicsExperiment
 *
 * @ORM\Table(name="omics_experiment")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\OmicsExperimentRepository")
 */
class OmicsExperiment
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
     * @var string
     *
     * @ORM\Column(name="project_name", type="string")
     *
     * @Assert\NotBlank()
     */
    private $projectName;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="requested_date", type="date")
     *
     * @Assert\NotBlank()
     * @Assert\Date()
     */
    private $requestedDate;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text")
     *
     * @Assert\NotBlank()
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(name="questions", type="text")
     *
     * @Assert\NotBlank()
     */
    private $questions;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="requested_end_date", type="date")
     *
     * @Assert\NotBlank()
     * @Assert\Date()
     */
    private $requestedEndDate;

    /**
     * @ORM\ManyToOne(targetEntity="FOSUser", inversedBy="omicsExperiments")
     * @ORM\JoinColumn(name="fos_user_id", referencedColumnName="id")
     */
    private $requestedBy;

    /**
     * @var File
     *
     * @ORM\OneToMany(targetEntity="File", mappedBy="omicsExperiment", cascade={"persist", "remove"})
     *
     */
    private $files;

    /**
     * @ORM\OneToMany(targetEntity="Status", mappedBy="omicsExperiment", cascade={"persist", "remove"})
     */
    private $statuses;

    /**
     * @ORM\OneToMany(targetEntity="OmicsExperimentType", mappedBy="omicsExperiment", cascade={"persist", "remove"})
     */
    private $omicsExperimentTypes;

    public function __construct()
    {
        $this->statuses = new ArrayCollection();
        $this->omicsExperimentTypes = new ArrayCollection();
        $this->files = new ArrayCollection();
        $this->requestedDate = new \DateTime();
        $this->requestedEndDate = new \DateTime();
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
     * Get projectName
     *
     * @return string
     */
    public function getProjectName()
    {
        return $this->projectName;
    }

    /**
     * Set projectName
     *
     * @param string $projectName
     *
     * @return OmicsExperiment
     */
    public function setProjectName($projectName)
    {
        $this->projectName = $projectName;

        return $this;
    }

    /**
     * Get requestedBy
     *
     * @return FOSUser
     */
    public function getRequestedBy()
    {
        return $this->requestedBy;
    }

    /**
     * Set requestedBy
     *
     * @param FOSUser $requestedBy
     *
     * @return OmicsExperiment
     */
    public function setRequestedBy($requestedBy)
    {
        $this->requestedBy = $requestedBy;

        return $this;
    }

    /**
     * Get requestedDate
     *
     * @return \DateTime
     */
    public function getRequestedDate()
    {
        return $this->requestedDate;
    }

    /**
     * Set requestedDate
     *
     * @param \DateTime $requestedDate
     *
     * @return OmicsExperiment
     */
    public function setRequestedDate($requestedDate)
    {
        $this->requestedDate = $requestedDate;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return OmicsExperiment
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get questions
     *
     * @return string
     */
    public function getQuestions()
    {
        return $this->questions;
    }

    /**
     * Set questions
     *
     * @param string $questions
     *
     * @return OmicsExperiment
     */
    public function setQuestions($questions)
    {
        $this->questions = $questions;

        return $this;
    }

    /**
     * Get requestedEndDate
     *
     * @return \DateTime
     */
    public function getRequestedEndDate()
    {
        return $this->requestedEndDate;
    }

    /**
     * Set requestedEndDate
     *
     * @param \DateTime $requestedEndDate
     *
     * @return OmicsExperiment
     */
    public function setRequestedEndDate($requestedEndDate)
    {
        $this->requestedEndDate = $requestedEndDate;

        return $this;
    }

    /**
     * Add status
     *
     * @param \AppBundle\Entity\Status $status
     *
     * @return OmicsExperiment
     */
    public function addStatus(\AppBundle\Entity\Status $status)
    {
        $this->statuses[] = $status;
        $status->setOmicsExperiment($this);

        return $this;
    }

    /**
     * Remove status
     *
     * @param \AppBundle\Entity\Status $status
     */
    public function removeStatus(\AppBundle\Entity\Status $status)
    {
        $this->statuses->removeElement($status);
        $status->setOmicsExperiment(null);
    }

    /**
     * Get statuses
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getStatuses()
    {
        return $this->statuses;
    }

    /**
     * Add omicsExperimentType
     *
     * @param \AppBundle\Entity\OmicsExperimentType $omicsExperimentType
     *
     * @return OmicsExperiment
     */
    public function addOmicsExperimentType(\AppBundle\Entity\OmicsExperimentType $omicsExperimentType)
    {
        $this->omicsExperimentTypes[] = $omicsExperimentType;
        $omicsExperimentType->setOmicsExperiment($this);

        return $this;
    }

    /**
     * Remove omicsExperimentType
     *
     * @param \AppBundle\Entity\OmicsExperimentType $omicsExperimentType
     */
    public function removeOmicsExperimentType(\AppBundle\Entity\OmicsExperimentType $omicsExperimentType)
    {
        $this->omicsExperimentTypes->removeElement($omicsExperimentType);
        $omicsExperimentType->setOmicsExperiment(null);
    }

    /**
     * Get omicsExperimentTypes
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getOmicsExperimentTypes()
    {
        return $this->omicsExperimentTypes;
    }

    /**
     * Add file
     *
     * @param \AppBundle\Entity\File $file
     *
     * @return OmicsExperiment
     */
    public function addFile(\AppBundle\Entity\File $file)
    {
        $this->files[] = $file;
        $file->setOmicsExperiment($this);

        return $this;
    }

    /**
     * Remove file
     *
     * @param \AppBundle\Entity\File $file
     */
    public function removeFile(\AppBundle\Entity\File $file)
    {
        $this->files->removeElement($file);
        $file->setOmicsExperiment(null);
    }

    /**
     * Get files
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getFiles()
    {
        return $this->files;
    }
}
