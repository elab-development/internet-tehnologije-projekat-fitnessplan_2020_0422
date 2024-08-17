<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkoutPart extends Model
{
    use HasFactory;

    public const TABLE = 'workout_parts';

    protected $table = self::TABLE;

    protected $fillable = [
        'workout_id',
        'exercise_id',
        'sets',
        'reps',
        'rest',
        'info',
    ];

    public function workout()
    {
        return $this->belongsTo(Workout::class);
    }

    public function exercise()
    {
        return $this->belongsTo(Exercise::class);
    }
}
