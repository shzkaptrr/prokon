<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SubMateri;
use App\Models\Materi; // Pastikan Materi Model di-import
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage; // Untuk upload file jika konten_path digunakan

class SubMateriController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Mengambil semua sub_materi (lesson) dengan relasi materinya
        $subMateris = SubMateri::with('materi')->get();
        return response()->json([
            'status' => 'success',
            'message' => 'SubMateris retrieved successfully',
            'data' => $subMateris
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'materi_id' => 'required|exists:materis,materi_id',
            'judul_sub_materi' => 'required|string|max:255',
            'tipe_materi' => 'required|in:video,teks,pdf,kuis,latihan,dokumen_eksternal',
            'konten_path' => 'nullable|string', // Bisa diubah jadi file|mimes:mp4,pdf,dst. jika ingin upload file
            'durasi' => 'nullable|integer|min:0',
            'urutan' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        // Handle file upload if tipe_materi is video or pdf and konten_path is a file
        // Contoh sederhana:
        $kontenPath = $request->input('konten_path');
        if ($request->hasFile('konten_file')) { // Misal nama input file adalah 'konten_file'
            $file = $request->file('konten_file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('public/materi_files', $fileName); // Simpan di storage/app/public/materi_files
            $kontenPath = Storage::url($path); // Dapatkan URL publik
        }

        $subMateri = SubMateri::create([
            'materi_id' => $request->materi_id,
            'judul_sub_materi' => $request->judul_sub_materi,
            'tipe_materi' => $request->tipe_materi,
            'konten_path' => $kontenPath, // Gunakan path yang diupload atau dari input
            'durasi' => $request->durasi,
            'urutan' => $request->urutan,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'SubMateri created successfully',
            'data' => $subMateri
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id (sub_materi_id)
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // Mengambil sub_materi (lesson) berdasarkan sub_materi_id dengan relasi materinya
        $subMateri = SubMateri::with('materi')->find($id);

        if (!$subMateri) {
            return response()->json([
                'status' => 'error',
                'message' => 'SubMateri not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'SubMateri retrieved successfully',
            'data' => $subMateri
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id (sub_materi_id)
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $subMateri = SubMateri::find($id);

        if (!$subMateri) {
            return response()->json([
                'status' => 'error',
                'message' => 'SubMateri not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'materi_id' => 'required|exists:materis,materi_id',
            'judul_sub_materi' => 'required|string|max:255',
            'tipe_materi' => 'required|in:video,teks,pdf,kuis,latihan,dokumen_eksternal',
            'konten_path' => 'nullable|string', // Bisa diubah jadi file|mimes:mp4,pdf,dst. jika ingin upload file
            'durasi' => 'nullable|integer|min:0',
            'urutan' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        // Handle file upload if tipe_materi is video or pdf and konten_path is a file
        // Contoh sederhana:
        $kontenPath = $request->input('konten_path');
        if ($request->hasFile('konten_file')) { // Misal nama input file adalah 'konten_file'
            // Hapus file lama jika ada
            if ($subMateri->konten_path && Storage::exists(str_replace('/storage', 'public', $subMateri->konten_path))) {
                Storage::delete(str_replace('/storage', 'public', $subMateri->konten_path));
            }
            $file = $request->file('konten_file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('public/materi_files', $fileName);
            $kontenPath = Storage::url($path);
        }

        $subMateri->update([
            'materi_id' => $request->materi_id,
            'judul_sub_materi' => $request->judul_sub_materi,
            'tipe_materi' => $request->tipe_materi,
            'konten_path' => $kontenPath,
            'durasi' => $request->durasi,
            'urutan' => $request->urutan,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'SubMateri updated successfully',
            'data' => $subMateri
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id (sub_materi_id)
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $subMateri = SubMateri::find($id);

        if (!$subMateri) {
            return response()->json([
                'status' => 'error',
                'message' => 'SubMateri not found'
            ], 404);
        }

        // Hapus file terkait jika ada
        if ($subMateri->konten_path && Storage::exists(str_replace('/storage', 'public', $subMateri->konten_path))) {
            Storage::delete(str_replace('/storage', 'public', $subMateri->konten_path));
        }

        $subMateri->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'SubMateri deleted successfully'
        ], 200);
    }

    /**
     * Get sub_materis by materi_id and optionally by tipe_materi.
     * Digunakan untuk mengambil semua lesson (sub_materi) untuk modul tertentu,
     * bisa difilter berdasarkan tipe materi (video, teks, dll.).
     *
     * @param  int  $materi_id
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getByMateriId($materi_id, Request $request)
    {
        $materi = Materi::find($materi_id);

        if (!$materi) {
            return response()->json([
                'status' => 'error',
                'message' => 'Materi (Module) not found'
            ], 404);
        }

        $query = SubMateri::where('materi_id', $materi_id)->orderBy('urutan');

        if ($request->has('tipe_materi') && in_array($request->tipe_materi, ['video', 'teks', 'pdf', 'kuis', 'latihan', 'dokumen_eksternal'])) {
            $query->where('tipe_materi', $request->tipe_materi);
        }

        $subMateris = $query->get();

        return response()->json([
            'status' => 'success',
            'message' => 'SubMateris for module retrieved successfully',
            'data' => $subMateris
        ], 200);
    }
}