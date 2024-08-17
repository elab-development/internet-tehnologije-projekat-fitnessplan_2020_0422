<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Intensity extends Model
{
    use HasFactory;

    public const TABLE = 'intensities';

    protected $table = self::TABLE;

    protected $fillable = [
        'level',
    ];

    public function workouts()
    {
        return $this->hasMany(Workout::class);
    }
}
