<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sub_materis', function (Blueprint $table) {
            $table->increments('sub_materi_id'); // Primary Key (Lesson ID)
            $table->unsignedInteger('materi_id'); // Foreign Key to materis table (using unsignedInteger because materi_id is increments which is unsigned int)
            $table->string('judul_sub_materi'); // Lesson Title
            $table->enum('tipe_materi', ['video', 'teks', 'pdf', 'kuis', 'latihan', 'dokumen_eksternal']); // Type of lesson
            $table->string('konten_path')->nullable(); // Path to video/pdf file or external URL
            $table->integer('durasi')->nullable(); // Duration for video (in minutes)
            $table->integer('urutan'); // Order of lesson within a module
            $table->timestamps();

            // Foreign Key Constraint
            $table->foreign('materi_id')->references('materi_id')->on('materis')->onDelete('cascade');

            // Add index for faster lookups
            $table->index('materi_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_materis');
    }
};