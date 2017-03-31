<?php

// src/AppBundle/Entity/FOSUser.php
namespace AppBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use FR3D\LdapBundle\Model\LdapUserInterface;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity
 * @ORM\Table(name="fos_user")
 * @ORM\AttributeOverrides({
 *     @ORM\AttributeOverride(name="password",
 *          column=@ORM\Column(
 *              name     = "password",
 *              type     = "string",
 *              nullable=true
 *          )
 *      )
 * })
 */
class FOSUser extends BaseUser implements LdapUserInterface
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column(type="string", name="dn")
     */
    protected $dn;

    /**
     * @var string
     *
     * @ORM\Column(type="string", name="cn")
     */
    protected $cn;

    /**
     * @var string
     *
     * @ORM\Column(type="string", name="department")
     */
    protected $department;

    /**
     * @var string
     *
     * @ORM\Column(type="string", name="departmentDn")
     */
    protected $departmentDn;

    /**
     * @ORM\OneToMany(targetEntity="OmicsExperiment", mappedBy="requestedBy")
     */
    private $omicsExperiments;

    /**
     * @ORM\OneToMany(targetEntity="SequenceRun", mappedBy="runBy")
     */
    private $sequenceRuns;

    /**
     * @ORM\OneToMany(targetEntity="Sample", mappedBy="sampledBy")
     */
    private $samples;

    public function __construct()
    {
        parent::__construct();
        if (empty($this->roles)) {
            $this->roles[] = 'ROLE_USER';
        }
        $this->omicsExperiments = new ArrayCollection();
        $this->sequenceRuns = new ArrayCollection();
        $this->samples = new ArrayCollection();
    }

    public function __toString()
    {
        return $this->getCn();
    }

    /**
     * {@inheritDoc}
     */
    public function getDn()
    {
        return $this->dn;
    }

    /**
     * {@inheritDoc}
     */
    public function setDn($dn)
    {
        $this->dn = $dn;

        return $this;
    }

    /**
     * Get cn
     *
     * @return string
     */
    public function getCn()
    {
        return $this->cn;
    }

    /**
     * Set realName
     *
     * @param string $realName
     *
     * @return FOSUser
     */
    public function setCn($cn)
    {
        $this->cn = $cn;

        return $this;
    }

    /**
     * Get department
     *
     * @return string
     */
    public function getDepartment()
    {
        return $this->department;
    }

    /**
     * Set department
     *
     * @param string $department
     *
     * @return FOSUser
     */
    public function setDepartment($department)
    {
        $this->department = $department;

        return $this;
    }

    /**
     * Get departmentDn
     *
     * @return string
     */
    public function getDepartmentDn()
    {
        return $this->departmentDn;
    }

    /**
     * Set departmentDn
     *
     * @param \AppBundle\Entity\FOSUser $departmentDn
     *
     * @return FOSUser
     */
    public function setDepartmentDn($departmentDn)
    {
        $this->departmentDn = $departmentDn;

        return $this;
    }

    /**
     * Add omicsExperiment
     *
     * @param \AppBundle\Entity\OmicsExperiment $omicsExperiment
     *
     * @return FOSUser
     */
    public function addOmicsExperiment(\AppBundle\Entity\OmicsExperiment $omicsExperiment)
    {
        $this->omicsExperiments[] = $omicsExperiment;
        $omicsExperiment->setRequestedBy($this);

        return $this;
    }

    /**
     * Remove omicsExperiment
     *
     * @param \AppBundle\Entity\OmicsExperiment $omicsExperiment
     */
    public function removeOmicsExperiment(\AppBundle\Entity\OmicsExperiment $omicsExperiment)
    {
        $this->omicsExperiments->removeElement($omicsExperiment);
    }

    /**
     * Get omicsExperiments
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getOmicsExperiments()
    {
        return $this->omicsExperiments;
    }

    /**
     * Add sequenceRun
     *
     * @param \AppBundle\Entity\SequenceRun $sequenceRun
     *
     * @return FOSUser
     */
    public function addSequenceRun(\AppBundle\Entity\SequenceRun $sequenceRun)
    {
        $this->sequenceRuns[] = $sequenceRun;
        $sequenceRun->setRunBy($this);

        return $this;
    }

    /**
     * Remove sequenceRun
     *
     * @param \AppBundle\Entity\SequenceRun $sequenceRun
     */
    public function removeSequenceRun(\AppBundle\Entity\SequenceRun $sequenceRun)
    {
        $this->omicsExperiments->removeElement($sequenceRun);
    }

    /**
     * Get sequenceRuns
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSequenceRuns()
    {
        return $this->sequenceRuns;
    }

    /**
     * Add sample
     *
     * @param \AppBundle\Entity\Sample $sample
     *
     * @return FOSUser
     */
    public function addSample(\AppBundle\Entity\Sample $sample)
    {
        $this->sequenceRuns[] = $sample;
        $sample->setSampledBy($this);

        return $this;
    }

    /**
     * Remove sample
     *
     * @param \AppBundle\Entity\Sample $sample
     */
    public function removeSample(\AppBundle\Entity\Sample $sample)
    {
        $this->samples->removeElement($sample);
    }

    /**
     * Get samples
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSamples()
    {
        return $this->samples;
    }
}