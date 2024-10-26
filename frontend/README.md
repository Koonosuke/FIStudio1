async とは？
async キーワードを使うと、その関数は非同期関数
非同期関数は Promise を返します。関数内部でエラーが発生した場合、そのエラーは Promise の拒否 (reject) として処理される。
このキーワードを使うことで、関数の中で非同期処理（例えば、サーバーに対するリクエストやデータベースの問い合わせなど）を簡単に行うことができる。

await とは？
await キーワードは、非同期関数の中でしか使用できない。
await を使うと、Promise が解決されるまで待機 →await の後に続く処理が完了するのを待ってから次の処理に進む

→ 非同期の処理が終わるのを待たずに次の処理が実行されるのを防ぎ、コードの流れが分かりやすくなる