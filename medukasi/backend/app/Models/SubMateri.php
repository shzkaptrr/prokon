<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class SubMateri extends Model
{
    use HasFactory;

    protected $table = 'sub_materis'; // Nama tabel
    protected $primaryKey = 'sub_materi_id'; // Primary key

    protected $fillable = [
        'materi_id',
        'judul_sub_materi',
        'tipe_materi',
        'konten_path',
        'durasi',
        'urutan',
    ];

    /**
     * Get the Materi that owns the SubMateri.
     */
    public function materi()
    {
        return $this->belongsTo(Materi::class, 'materi_id', 'materi_id');
    }

    public function userStatus()
    {
        return $this->hasOne(SubMateriUserStatus::class, 'sub_materi_id')
            ->where('user_id', Auth::id());
    }

public function getUserStatusAttribute()
{
    // kalau relasi ada dan bukan null, return itu
    if ($this->relationLoaded('userStatus') && $this->userStatus) {
        return $this->userStatus;
    }

    // kalau tidak ada, return default manual
    return (object)[
        'status' => 'buka',
         'user_id' => Auth::id(),
        'sub_materi_id' => $this->sub_materi_id,
    ];
}

}