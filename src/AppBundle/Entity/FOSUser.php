<?php

// src/AppBundle/Entity/FOSUser.php
namespace AppBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use FR3D\LdapBundle\Model\LdapUserInterface;
use Doctrine\ORM\Mapping as ORM;

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
     * @ORM\Column(type="string", name="dn")
     */
    protected $dn;

    /**
     * @ORM\Column(type="string", name="department")
     */
    protected $department;

    /**
     * @ORM\Column(type="string", name="departmentDn")
     */
    protected $departmentDn;

    public function __construct()
    {
        parent::__construct();
        if (empty($this->roles)) {
            $this->roles[] = 'ROLE_USER';
        }
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
     * @param \AppBundle\Entity\FOSUser $department
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
     * Get username for views.
     *
     * @return string
     */
    public function getUsernameForView()
    {
        return str_replace('.', ' ', $this->username);
    }
}