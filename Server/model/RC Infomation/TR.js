import mongoose from "mongoose"
const TR_schema = new mongoose.Schema({
    status: {
        type: String
    },
    rto: {
        type: String
    },
    reg_no: {
        type: String
    },
    reg_dt: {
        type: String
    },
    chasi_no: {
        type: String
    },
    enginne_no: {
        type: String
    },
    owner_name: {
        type: String
    },
    vh_class: {
        type: String
    },
    fuel_type: {
        type: String
    },
    maker: {
        type: String
    },
    vehicle_age: {
        type: String
    },
    insUpto: {
        type: String
    },
    state: {
        type: String
    },
    policy_no: {
        type: String
    },
    puc_no: {
        type: String
    },
    puc_upto: {
        type: String
    },
    insurance_comp: {
        type: String
    },
    source: {
        type: String
    },
    maker_modal: {
        type: String
    },
    father_name: {
        type: String
    },
    address: {
        type: String
    },
    owner_sr_no: {
        type: Number
    },
    insurance_company: {
        type: String
    },
    vehicle_color: {
        type: String
    },
    fitness_upto: {
        type: String
    },
    parivahan_json: {
        type: String
    },
    own_json: {
        type: String
    },
    financer_details: {
        type: String
    },
    fuel_norms: {
        type: String
    },
    no_of_seats: {
        type: String
    },
    body_type_desc: {
        type: String
    },
    reng_at: {
        type: String
    },
    menufacturer_month_yr: {
        type: String
    },
    gvw: {
        type: String
    },
    no_of_cyl: {
        type: String
    },
    cubic_cap: {
        type: String
    },
    sheeper_cap: {
        type: String
    },
    stand_cap: {
        type: String
    },
    wheelbase: {
        type: String
    },
    mobile_no: {
        type: String
    },
    permit_no: {
        type: String
    },
    permit_issue_date: {
        type: String
    },
    permit_from: {
        type: String
    },
    permit_upto: {
        type: String
    },
    permit_type: {
        type: String
    },
    rc_np_no: {
        type: String
    },
    rc_np_upto: {
        type: String
    },
    rc_np_issued_by: {
        type: String
    },
    rc_unid_wt: {
        type: String
    },
    blacklist_status: {
        type: String
    },
    noc_details: {
        type: String
    },
    tax_upto: {
        type: String
    },
    is_update: {
        type: Number
    },

}, { timestamps: true })

const TR_modal = mongoose.model('TR', TR_schema)
export default TR_modal