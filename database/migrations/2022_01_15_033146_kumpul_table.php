<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class KumpulTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kumpul', function (Blueprint $table) {
            $table->id();
            $table->string('nama',255);
            $table->string('nilai',255);
            $table->string('kelas_slug',255);
            $table->string('mapel_slug',255);
            $table->string('bab_slug',255);
            $table->string('tugas_slug',255);
            $table->string('gambar',255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kumpul');
    }
}
