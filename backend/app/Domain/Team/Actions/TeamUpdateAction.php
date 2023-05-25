<?php

namespace IqInfinite\Team\Actions;

use App\Contracts\ActionInterface;
use App\Http\Requests\Team\TeamUpdateRequest;
use App\Models\Team;
use Illuminate\Support\Facades\Storage;

class TeamUpdateAction implements ActionInterface
{
    /**
     * @param  TeamUpdateRequest  $request
     * @param Team $team
     */
    public function __construct(
        private TeamUpdateRequest $request,
        private Team $team
    ) {
        $this->request = $request;
        $this->team = $team;
    }

    /**
     * @return Team
     */
    public function execute(): Team
    {
        /*
        |--------------------------------------------------------------------------
        | update team data into database
        |--------------------------------------------------------------------------
        */

        $this->team->firstname = $this->request->firstname;
        $this->team->lastname = $this->request->lastname;
        $this->team->email = $this->request->email;
        $this->team->phone = $this->request->phone ? $this->request->phone : null;
        $this->team->designation = $this->request->designation;
        /*
        |--------------------------------------------------------------------------
        | Upload image to local
        |--------------------------------------------------------------------------
        */

        if ($this->request->file('image')) {
            if (Storage::disk('public')->exists($this->team->image)) {
                Storage::disk('public')->delete($this->team->image);
            }
            $filePath =  uniqid() . '.' . $this->request->file('image')->getClientOriginalExtension();
            Storage::disk('public')->put($filePath, file_get_contents($this->request->file('image')));
            $this->team->image = $filePath;
        }
        $this->team->save();

        /*
         |--------------------------------------------------------------------------
         | Response
         |--------------------------------------------------------------------------
         */

        return $this->team;
    }
}
