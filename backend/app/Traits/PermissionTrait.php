<?php

namespace App\Traits;

use App\Foundation\Permission;
use App\Models\Vet;

trait PermissionTrait
{
    public function listPermissions()
    {
        return Permission::list($this);
    }

    public function addPermission(Vet $vet, int $level = null)
    {
        return Permission::add($this, $vet, $level);
    }

    public function revokePermission(Vet $vet)
    {
        return Permission::revoke($this, $vet);
    }

    public function revokeAllPermissions()
    {
        return Permission::revokeAll($this);
    }

    public function canAccess(Vet $vet = null)
    {
        return Permission::canAccess($this, $vet);
    }
}
