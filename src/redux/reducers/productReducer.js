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
    no_registrasi: null,
    upload1an:'',
    halproduk:'',
    show:false
}

const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'RENDER_ADDPRODUCT1':
            return{
                ...state,
                halproduk:action.payload,
                upload1an:'Berhasil menambahkan produk',
                show: true
            }
            case 'RENDER_ADDPRODUCT1_FAIL':
            return{
                ...state,
                // halproduk:action.payload,
                upload1an:'Gagal menambahkan produk',
                show: true
            }

        default:
            return state
    }
}

export default productReducer