//权限设置

const  ifAuthority = (pathName, btnType) => {

    let authorityList = JSON.parse(localStorage.getItem('menuList'));
    let btnList = [];
    if (authorityList.length > 0) {
        authorityList.forEach((ele, index) => {
            if (ele.path == pathName) {
                ele.authorities.forEach(aut => {
                    btnList.push(aut);
                })
            } else {
                if (ele.submenu.length > 0) {
                    ele.submenu.forEach(chil => {
                        if (chil.path == pathName) {
                            chil.authorities?.forEach(grandChild => {
                                btnList.push(grandChild);
                            })
                        }
                    })
                }
                if (ele.authorities&&ele.authorities.length > 0) {
                    ele.authorities.forEach(aut => {
                        if (aut.path == pathName) {
                            aut.authorities.forEach(grandChild => {
                                btnList.push(grandChild);
                            })
                        }
                    })
                }
            }
        })
    }
    if (btnList.indexOf(btnType) > -1) {
        return true;
    } else {
        return false;
    }

};
export {
    ifAuthority
}
