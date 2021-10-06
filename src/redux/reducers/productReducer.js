const INITIAL_STATE = {
    idproduk: null,
    nama: null,
    harga: null,
    stok: null,
    satuan: null,
    link_foto: null,
    kategori: null,
    deskripsi: null,
    indikasi_umum: null,
    komposisi: null,
    dosis: null,
    aturan_pakai: null,
    kontra_indikasi: null,
    perhatian: null,
    efek_samping: null,
    segmentasi: null,
    kemasan: null,
    manufaktur: null,
    no_registrasi: null
}

const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default productReducer