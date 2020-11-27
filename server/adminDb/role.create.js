
const roleCr = async function roleCr (db){
    await db.role.bulkCreate([
       {role: 'admin'},
       {role: 'user'},
       {role: 'trainer'}
    ]
    ).catch(err => {
        console.log(err.message);
    })
}

module.exports=roleCr
