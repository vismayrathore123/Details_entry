$(document).ready(function () {
    var arr = new Array([]);

    $("button").click(function () {
        var first = $('#first').val();
        var last = $('#last').val();
        var contact = $('#contact').val();
        let name = first + " " + last;
        if (first.length == 0 || last.length == 0 || contact.length == 0) {
            alert("Enter details");
        }
        else if (jQuery.inArray(name.toLocaleLowerCase(), arr) == -1 && jQuery.inArray(contact.toLocaleLowerCase(), arr) == -1) {
            var row = '<tr><td class="sn">' + '</td><td class="name">' + name + '</td><td class="contact">' + contact + '<td><button id="DeleteButton">X</button></td>';
            $("table tbody").append(row);
            arr.push(name.toLowerCase());
            arr.push(contact.toLowerCase());
            arr.sort();
        }
        else {
            ;
            alert("Details are not unique!!!");
        }
        $("input").val('');
    });

    $("#search").on("keyup", function () {
        var value = $(this).val().toLocaleLowerCase();
        $('#details tr').filter(function () {
            $(this).toggle($(this).text().toLocaleLowerCase().indexOf(value) > -1);
        })
    });

    $("#details").on("click", "#DeleteButton", function () {
        let auth = confirm("Conform deletion!!!");
        if (auth) {
            arr[jQuery.inArray($('tr .name').text().toLocaleLowerCase(), arr)] = 0;
            arr[jQuery.inArray($('tr .contact').text().toLocaleLowerCase(), arr)] = 0;
            arr.sort().splice(-2);
            $(this).closest("tr").remove();
        }
    });

    $(function () {
        const ths = $("th");
        let sortOrder = 1;

        ths.on("click", function () {
            const rows = sortRows(this);
            rebuildTbody(rows);
            updateClassName(this);
            sortOrder *= -1;
        })

        function sortRows(th) {
            const rows = $.makeArray($('tbody > tr'));
            const col = th.cellIndex;
            const type = th.dataset.type;
            rows.sort(function (a, b) {
                return compare(a, b, col, type) * sortOrder;
            });
            return rows;
        }

        function compare(a, b, col, type) {
            let _a = a.children[col].textContent;
            let _b = b.children[col].textContent;
            if (type === "number") {
                _a *= 1;
                _b *= 1;
            } else if (type === "string") {
                _a = _a.toLowerCase();
                _b = _b.toLowerCase();
            }

            if (_a < _b) {
                return -1;
            }
            if (_a > _b) {
                return 1;
            }
            return 0;
        }

        function rebuildTbody(rows) {
            const tbody = $("tbody");
            while (tbody.firstChild) {
                tbody.remove(tbody.firstChild);
            }

            let j;
            for (j = 0; j < rows.length; j++) {
                tbody.append(rows[j]);
            }
        }

        function updateClassName(th) {
            let k;
            for (k = 0; k < ths.length; k++) {
                ths[k].className = "";
            }
            th.className = sortOrder === 1 ? "asc" : "desc";
        }
    });
});