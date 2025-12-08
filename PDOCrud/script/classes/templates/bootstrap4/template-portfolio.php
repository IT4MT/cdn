<div class="pdocrud-table" data-obj-key="<?php echo $objKey; ?>">
    <input type="hidden" value="<?php echo $objKey; ?>" class="pdocrud-hidden-data pdoobj" />
    <?php
    $row_count = 0;
    $bootstrap_col = 12/$colPerRow;
    if ($data)
        foreach ($data as $rows) {
            if( $row_count % $colPerRow === 0 )
             echo "<div id=\"pdocrud_portfolio_$row_count\" class=\"row pdocrud-portfolio-row\">";
            ?>
                <div class="col-xs-<?php echo $bootstrap_col?> pdocrud-portfolio-col">
                    <div class="pdocrud-portfolio-card">
                        <div class="pdocrud-portfolio-content">
                        <?php
                        foreach ($rows as $col => $row) {
                            if(!in_array($col, $colsRemove)){
                                 if (is_array($row)) {
                                     ?>
                                    <div class="pdocrud-portfolio-col-data <?php if(isset($row["class"])) echo $row["class"]; ?>"  <?php if(isset($row["style"])) echo $row["style"]; ?>>
                                    <?php if(isset($row["sum_type"])) { echo $lang[$row["sum_type"]]; $sumrow = true; }?>
                                    <?php echo $row["content"]; ?>
                                    </div>
                                    <?php
                                 }
                                 else{
                                     ?>    
                                    <div class="pdocrud-portfolio-col-data">
                                    <?php echo $row; ?>
                                    </div>
                                    <?php
                                     
                                 }
                            }
                        }
                        ?>
                        </div>
                        <?php
                        if (is_array($btnActions) && count($btnActions)) {
                            ?>
                           <div  class="pdocrud-row-actions-portfolio">
                            <?php foreach ($btnActions as  $action_name => $action) { 
                                list( $key, $colName, $action_val, $type, $text, $attr, $url) = $action;
                                $columnVal = isset($rows[$colName]) ? $rows[$colName] : "";
                                $url =  preg_replace('/{[^}]+}/', $rows[$pk], $url);
                                if (is_array($text) && isset($text[$rows[$colName]]))
                                    $action_text = $text[$rows[$colName]];
                                else 
                                    $action_text = $text;
                                
                                ?>
                               <a class="pdocrud-actions pdocrud-button-portfolio pdocrud-button-portfolio-<?php echo $action_name;?>"
                                 href="<?php echo $url;?>"
                                 <?php
                                echo implode(', ', array_map(
                                                function ($v, $k) {
                                            return $k . '=' . $v;
                                        }, $attr, array_keys($attr)
                                )); ?>  
                                data-id="<?php echo $rows[$pk]; ?>" 
                                data-column-val="<?php echo $columnVal ?>"
                                data-unique-id="<?php echo $key; ?>" 
                                data-action="<?php echo $type;?>"><?php echo $action_text; ?>
                               </a>
                           <?php } ?>
                           </div>
                        <?php } ?> 
                    </div>
                </div>
                <?php
               $row_count++;
                if( $row_count !=0 && $row_count % $colPerRow === 0 )
                echo "</div>";
            }
    ?>
</div>

<style>
.pdocrud-portfolio-card {
    border: 2px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 250px;
}

.pdocrud-portfolio-content {
    flex: 1;
    margin-bottom: 15px;
    overflow-y: auto;
    max-height: 200px;
}

.pdocrud-portfolio-col-data {
    margin-bottom: 10px;
    padding: 8px;
    border-bottom: 1px solid #eee;
    word-wrap: break-word;
}

.pdocrud-portfolio-col-data:last-child {
    border-bottom: none;
}

.pdocrud-row-actions-portfolio {
    display: flex;
    gap: 8px;
    border-top: 1px solid #ddd;
    padding-top: 12px;
    flex-wrap: wrap;
    justify-content: center;
}

.pdocrud-button-portfolio {
    flex: 1;
    min-width: 80px;
    padding: 12px 16px !important;
    font-size: 14px !important;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    color: white !important;
}

.pdocrud-button-portfolio-edit {
    background-color: #007bff;
}

.pdocrud-button-portfolio-edit:hover {
    background-color: #0056b3;
    box-shadow: 0 4px 12px rgba(0,86,179,0.3);
}

.pdocrud-button-portfolio-delete {
    background-color: #dc3545;
}

.pdocrud-button-portfolio-delete:hover {
    background-color: #c82333;
    box-shadow: 0 4px 12px rgba(220,53,69,0.3);
}

.pdocrud-button-portfolio-view {
    background-color: #28a745;
}

.pdocrud-button-portfolio-view:hover {
    background-color: #1e7e34;
    box-shadow: 0 4px 12px rgba(40,167,69,0.3);
}

.pdocrud-button-portfolio-add {
    background-color: #17a2b8;
}

.pdocrud-button-portfolio-add:hover {
    background-color: #117a8b;
    box-shadow: 0 4px 12px rgba(23,162,184,0.3);
}

@media (max-width: 768px) {
    .pdocrud-portfolio-card {
        min-height: 220px;
        padding: 12px;
    }
    
    .pdocrud-button-portfolio {
        min-width: 70px;
        padding: 10px 12px !important;
        font-size: 13px !important;
    }
}
</style>