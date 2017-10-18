<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * SequenceRun
 * @ORM\Table(name="sequence_run")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SequenceRunRepository")
 */
class SequenceRun
{
    /**
     * @var int
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var \DateTime
     * @ORM\Column(name="start_date", type="date")
     * @Assert\NotBlank()
     * @Assert\Date()
     */
    private $startDate;

    /**
     * @var \DateTime
     * @ORM\Column(name="end_dat", type="date")
     * @Assert\NotBlank()
     * @Assert\Date()
     */
    private $endDate;

    /**
     * @var string
     * @ORM\Column(name="kit", type="string")
     * @Assert\NotBlank()
     */
    private $kit;

    /**
     * @ORM\ManyToOne(targetEntity="MaterialTypeStrings", inversedBy="sequenceRuns")
     * @ORM\JoinColumn(name="material_type_strings_id", referencedColumnName="id")
     * @Assert\NotNull()
     */
    private $materialTypeString;

    /**
     * @var int
     * @ORM\Column(name="run_coverage_target", type="integer")
     * @Assert\NotBlank()
     */
    private $runCoverageTarget;

    /**
     * @var int
     * @ORM\Column(name="read_length", type="integer")
     * @Assert\NotBlank()
     */
    private $readLength;

    /**
     * @var \DateTime
     * @ORM\Column(name="created_at", type="date")
     * @Assert\NotBlank()
     * @Assert\Date()
     */
    private $createdAt;

    /**
     * @var \DateTime
     * @ORM\Column(name="updated_at", type="date")
     * @Assert\NotBlank()
     * @Assert\Date()
     */
    private $updatedAt;


    /**
     * Many Groups have Many Users.
     * @ORM\ManyToMany(targetEntity="FOSUser", mappedBy="sequenceRuns")
     */
    private $users;

    /**
     * @var File
     * @ORM\OneToMany(targetEntity="File", mappedBy="sequenceRun", cascade={"persist", "remove"})
     */
    private $files;

    /**
     * @ORM\OneToMany(targetEntity="Sample", mappedBy="sequenceRun", cascade={"persist", "remove"})
     */
    private $samples;

    /**
     * @ORM\OneToMany(targetEntity="Version", mappedBy="sequenceRun", cascade={"persist", "remove"})
     */
    private $versions;

    public function __construct()
    {
        $this->samples = new ArrayCollection();
        $this->files = new ArrayCollection();
        $this->users = new ArrayCollection();
        $this->versions = new ArrayCollection();
        $this->startDate = new \DateTime();
        $this->endDate = new \DateTime();
        $this->createdAt = new \DateTime();
        $this->updatedAt = new \DateTime();
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
     * Add user
     * @param \AppBundle\Entity\FOSUser $user
     * @return SequenceRun
     */
    public function addUser(\AppBundle\Entity\FOSUser $user)
    {
        $this->users[] = $user;
        $user->addSequenceRun($this);

        return $this;
    }

    /**
     * Remove user
     * @param \AppBundle\Entity\FOSUser $user
     */
    public function removeUser(\AppBundle\Entity\FOSUser $user)
    {
        $this->users->removeElement($user);
        $user->removeSequenceRun(null);
    }

    /**
     * Get users
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getUsers()
    {
        return $this->users;
    }

    /**
     * Get startDate
     * @return \DateTime
     */
    public function getStartDate()
    {
        return $this->startDate;
    }

    /**
     * Set startDate
     * @param \DateTime $startDate
     * @return SequenceRun
     */
    public function setStartDate($startDate)
    {
        $this->startDate = $startDate;

        return $this;
    }

    /**
     * Get endDate
     * @return \DateTime
     */
    public function getEndDate()
    {
        return $this->endDate;
    }

    /**
     * Set endDate
     * @param \DateTime $endDate
     * @return SequenceRun
     */
    public function setEndDate($endDate)
    {
        $this->endDate = $endDate;

        return $this;
    }

    /**
     * Get kit
     * @return string
     */
    public function getKit()
    {
        return $this->kit;
    }

    /**
     * Set kit
     * @param string $kit
     * @return SequenceRun
     */
    public function setKit($kit)
    {
        $this->kit = $kit;

        return $this;
    }

    /**
     * Get runCoverageTarget
     * @return int
     */
    public function getRunCoverageTarget()
    {
        return $this->runCoverageTarget;
    }

    /**
     * Set runCoverageTarget
     * @param integer $runCoverageTarget
     * @return SequenceRun
     */
    public function setRunCoverageTarget($runCoverageTarget)
    {
        $this->runCoverageTarget = $runCoverageTarget;

        return $this;
    }

    /**
     * Get readLength
     * @return int
     */
    public function getReadLength()
    {
        return $this->readLength;
    }

    /**
     * Set readLength
     * @param integer $readLength
     * @return SequenceRun
     */
    public function setReadLength($readLength)
    {
        $this->readLength = $readLength;

        return $this;
    }

    /**
     * Set createdAt
     * @param \DateTime $createdAt
     * @return SequenceRun
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
     * Set updatedAt
     * @param \DateTime $updatedAt
     * @return SequenceRun
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Add sample
     * @param \AppBundle\Entity\Sample $sample
     * @return SequenceRun
     */
    public function addSample(\AppBundle\Entity\Sample $sample)
    {
        $this->samples[] = $sample;
        $sample->setSequenceRun($this);

        return $this;
    }

    /**
     * Remove sample
     * @param \AppBundle\Entity\Sample $sample
     */
    public function removeSample(\AppBundle\Entity\Sample $sample)
    {
        $this->samples->removeElement($sample);
        $sample->setSequenceRun(null);
    }

    /**
     * Get samples
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSamples()
    {
        return $this->samples;
    }

    /**
     * Get materialTypeString
     * @return \AppBundle\Entity\MaterialTypeStrings
     */
    public function getMaterialTypeString()
    {
        return $this->materialTypeString;
    }

    /**
     * Set materialTypeString
     * @param \AppBundle\Entity\MaterialTypeStrings $materialTypeString
     * @return SequenceRun
     */
    public function setMaterialTypeString(\AppBundle\Entity\MaterialTypeStrings $materialTypeString = null)
    {
        $this->materialTypeString = $materialTypeString;

        return $this;
    }

    /**
     * Add file
     * @param \AppBundle\Entity\File $file
     * @return SequenceRun
     */
    public function addFile(\AppBundle\Entity\File $file)
    {
        $this->files[] = $file;
        $file->setSequenceRun($this);

        return $this;
    }

    /**
     * Remove file
     * @param \AppBundle\Entity\File $file
     */
    public function removeFile(\AppBundle\Entity\File $file)
    {
        $this->files->removeElement($file);
        $file->setSequenceRun(null);
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
     * @return SequenceRun
     */
    public function addVersion(\AppBundle\Entity\Version $version)
    {
        $this->versions[] = $version;
        $version->setSequenceRun($this);

        return $this;
    }

    /**
     * Remove version
     * @param \AppBundle\Entity\Version $version
     */
    public function removeVersion(\AppBundle\Entity\Version $version)
    {
        $this->versions->removeElement($version);
        $version->setSequenceRun(null);
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
