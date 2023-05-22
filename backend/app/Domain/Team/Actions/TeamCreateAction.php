<?php

namespace IqInfinite\Team\Actions;

use App\Contracts\ActionInterface;
use App\Http\Requests\Team\TeamStoreRequest;
use App\Models\Team;
use Illuminate\Support\Facades\Storage;

class TeamCreateAction implements ActionInterface
{
    /**
     * @param  TeamStoreRequest  $request
     */
    public function __construct(
        private TeamStoreRequest $request,
    ) {
    }

    /**
     * @return Team
     */
    public function execute(): Team
    {
        /*
        |--------------------------------------------------------------------------
        | Add team data into database
        |--------------------------------------------------------------------------
        */

        $team = new Team();
        $team->firstname = $this->request->firstname;
        $team->lastname = $this->request->lastname;
        $team->email = $this->request->email;
        $team->phone = $this->request->phone ? $this->request->phone : null;
        $team->designation = $this->request->designation;
        /*
        |--------------------------------------------------------------------------
        | Upload image to local
        |--------------------------------------------------------------------------
        */

        if ($this->request->has('image')) {
            $filePath =  time() . '.' . $this->request->file('image')->getClientOriginalExtension();
            Storage::disk('public')->put($filePath, file_get_contents($this->request->file('image')));
            $team->image = $filePath;
        }
        $team->save();

        /*
         |--------------------------------------------------------------------------
         | Response
         |--------------------------------------------------------------------------
         */

        return $team;
    }
}
