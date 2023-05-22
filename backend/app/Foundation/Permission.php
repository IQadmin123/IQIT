<?php

namespace App\Foundation;

use App\Models\User;
use App\Models\UserAccess;
use App\Models\Vet;
use Illuminate\Support\Facades\Cache;

class Permission
{
    /**
     * List all permission entries for user
     *
     * @param  App\Models\User  $user
     * @return Illuminate\Database\Eloquent\Collection
     */
    public static function list(User $user)
    {
        return UserAccess::where('user_id', $user->id)->get();
    }

    /**
     * Add permission entry for user
     *
     * @param  App\Models\User  $user
     * @param  App\Models\Vet  $vet
     * @param  int  $level
     * @return App\Models\UserAccess
     */
    public static function add(User $user, Vet $vet, int $level = null)
    {
        $permission = UserAccess::firstOrNew(['user_id' => $user->id, 'vet_id' => $vet->id]);
        $permission->user_id = $user->id;
        $permission->vet_id = $vet->id;
        $permission->level_id = $level;
        $permission->save();

        return $permission;
    }

    /**
     * Revoke permission entry for user
     *
     * @param  App\Models\User  $user
     * @param  App\Models\Vet  $vet
     */
    public static function revoke(User $user, Vet $vet)
    {
        $revoke = UserAccess::where('user_id', $user->id)->where('vet_id', $vet->id)->first()->delete();
    }

    /**
     * Revoke all permission entries for user
     *
     * @param  App\Models\User  $user
     * @return Collection
     */
    public static function revokeAll(User $user)
    {
        $revoke = UserAccess::where('user_id', $user->id)->delete();
    }

    /**
     * Vets user can access
     *
     * @param $user
     * @param  App\Models\Vet  $vet
     * @return mixed
     */
    public static function canAccess($user, Vet $vet = null)
    {
        // User: Trustvet
        if ($user->role_id == 1 && isset($vet)) {
            return true;
        } elseif ($user->role_id == 1 && ! isset($vet)) {
            return Cache::driver('array')->rememberForever('permission:trustvet:vets', function () {
                return Vet::all()->sortBy('name');
            });
        }

        // User: Vet
        if ($user->role_id == 2 && isset($vet)) {
            return self::canAccess($user)->contains('id', $vet->id);
        } elseif ($user->role_id == 2 && ! isset($vet)) {
            return UserAccess::where('user_id', $user->id)->get()->pluck('vet')->sortBy('name');
        }
    }
}
