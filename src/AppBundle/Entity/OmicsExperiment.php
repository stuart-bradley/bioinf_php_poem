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
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(name="project_name", type="string")
     * @Assert\NotBlank()
     */
    private $projectName;

    /**
     * @var string
     * @ORM\Column(name="project_id", type="string", unique=true)
     */
    private $projectID;

    /**
     * @var \DateTime
     * @ORM\Column(name="requested_date", type="date")
     * @Assert\NotBlank()
     * @Assert\Date()
     */
    private $requestedDate;

    /**
     * @var string
     * @ORM\Column(name="description", type="text", nullable=true)
     *
     */
    private $description;

    /**
     * @var string
     * @ORM\Column(name="questions", type="text", nullable=true)
     *
     */
    private $questions;

    /**
     * @var \DateTime
     * @ORM\Column(name="requested_end_date", type="date")
     * @Assert\NotBlank()
     * @Assert\Date()
     */
    private $requestedEndDate;

    /**
     * @var \DateTime
     * @ORM\Column(name="created_at", type="date")
     * @Assert\NotBlank()
     * @Assert\Date()
     */
    private $createdAt;

    /**
     * Many Groups have Many Users.
     * @ORM\ManyToMany(targetEntity="FOSUser", mappedBy="omicsExperiments")
     */
    private $users;

    /**
     * @var File
     * @ORM\OneToMany(targetEntity="File", mappedBy="omicsExperiment", cascade={"persist", "remove"})
     *
     */
    private $files;

    /**
     * @ORM\OneToMany(targetEntity="Status", mappedBy="omicsExperiment", cascade={"persist", "remove"})
     */
    private $statuses;

    /**
     * @ORM\OneToMany(targetEntity="Version", mappedBy="omicsExperiment", cascade={"persist", "remove"})
     */
    private $versions;

    /**
     * @ORM\OneToMany(targetEntity="OmicsExperimentType", mappedBy="omicsExperiment", cascade={"persist", "remove"})
     */
    private $omicsExperimentTypes;

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->statuses = new ArrayCollection();
        $this->omicsExperimentTypes = new ArrayCollection();
        $this->files = new ArrayCollection();
        $this->versions = new ArrayCollection();
        $this->requestedDate = new \DateTime();
        $this->requestedEndDate = new \DateTime();
        $this->createdAt = new \DateTime();
    }
    
    /**
     * Get id
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get projectName
     * @return string
     */
    public function getProjectName()
    {
        return $this->projectName;
    }

    /**
     * Set projectName
     * @param string $projectName
     * @return OmicsExperiment
     */
    public function setProjectName($projectName)
    {
        $this->projectName = $projectName;

        return $this;
    }

    /**
     * Get projectID
     * @return string
     */
    public function getProjectID()
    {
        return $this->projectID;
    }

    /**
     * Set projectID
     * @param string $projectID
     * @return OmicsExperiment
     */
    public function setProjectID($projectID)
    {
        $this->projectID = $projectID;

        return $this;
    }

    /**
     * Get requestedDate
     * @return \DateTime
     */
    public function getRequestedDate()
    {
        return $this->requestedDate;
    }

    /**
     * Set requestedDate
     * @param \DateTime $requestedDate
     * @return OmicsExperiment
     */
    public function setRequestedDate($requestedDate)
    {
        $this->requestedDate = $requestedDate;

        return $this;
    }

    /**
     * Get description
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set description
     * @param string $description
     * @return OmicsExperiment
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get questions
     * @return string
     */
    public function getQuestions()
    {
        return $this->questions;
    }

    /**
     * Set questions
     * @param string $questions
     * @return OmicsExperiment
     */
    public function setQuestions($questions)
    {
        $this->questions = $questions;

        return $this;
    }

    /**
     * Get requestedEndDate
     * @return \DateTime
     */
    public function getRequestedEndDate()
    {
        return $this->requestedEndDate;
    }

    /**
     * Set createdAt
     * @param \DateTime $createdAt
     * @return OmicsExperiment
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set requestedEndDate
     * @param \DateTime $requestedEndDate
     * @return OmicsExperiment
     */
    public function setRequestedEndDate($requestedEndDate)
    {
        $this->requestedEndDate = $requestedEndDate;

        return $this;
    }

    /**
     * Add user
     * @param \AppBundle\Entity\FOSUser $user
     * @return OmicsExperiment
     */
    public function addUser(\AppBundle\Entity\FOSUser $user)
    {
        $this->users[] = $user;
        $user->addOmicsExperiment($this);

        return $this;
    }

    /**
     * Remove user
     * @param \AppBundle\Entity\FOSUser $user
     */
    public function removeUser(\AppBundle\Entity\FOSUser $user)
    {
        $this->statuses->removeElement($user);
        $user->removeOmicsExperiment(null);
    }

    /**
     * Get users
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getUsers()
    {
        return $this->users;
    }

    /*
     * Checks if user exists
     * @param \AppBundle\Entity\FOSUser $user
     * @return boolean
     *
     */
    public function hasUser(\AppBundle\Entity\FOSUser $user)
    {
        foreach ($this->users as $u) {
            if ($user == $u) {
                return true;
            }
        }
        return false;
    }

    /**
     * Add status
     * @param \AppBundle\Entity\Status $status
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
     * @param \AppBundle\Entity\Status $status
     */
    public function removeStatus(\AppBundle\Entity\Status $status)
    {
        $this->statuses->removeElement($status);
        $status->setOmicsExperiment(null);
    }

    /**
     * Get statuses
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getStatuses()
    {
        return $this->statuses;
    }

    /**
     * Add omicsExperimentType
     * @param \AppBundle\Entity\OmicsExperimentType $omicsExperimentType
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
     * @param \AppBundle\Entity\OmicsExperimentType $omicsExperimentType
     */
    public function removeOmicsExperimentType(\AppBundle\Entity\OmicsExperimentType $omicsExperimentType)
    {
        $this->omicsExperimentTypes->removeElement($omicsExperimentType);
        $omicsExperimentType->setOmicsExperiment(null);
    }

    /**
     * Get omicsExperimentTypes
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getOmicsExperimentTypes()
    {
        return $this->omicsExperimentTypes;
    }

    /**
     * Add file
     * @param \AppBundle\Entity\File $file
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
     * @param \AppBundle\Entity\File $file
     */
    public function removeFile(\AppBundle\Entity\File $file)
    {
        $this->files->removeElement($file);
        $file->setOmicsExperiment(null);
    }

    /**
     * Get files
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getFiles()
    {
        return $this->files;
    }

    /**
     * Add version
     * @param \AppBundle\Entity\Version $version
     * @return OmicsExperiment
     */
    public function addVersion(\AppBundle\Entity\Version $version)
    {
        $this->versions[] = $version;
        $version->setOmicsExperiment($this);

        return $this;
    }

    /**
     * Remove version
     * @param \AppBundle\Entity\Version $version
     */
    public function removeVersion(\AppBundle\Entity\Version $version)
    {
        $this->versions->removeElement($version);
        $version->setOmicsExperiment(null);
    }

    /**
     * Get versions
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getVersions()
    {
        return $this->versions;
    }
}
